type BaseTypeMapping = {
  [key: string]: string;
};

const baseTypeMapping: BaseTypeMapping = {
  String: "string",
  Int: "number",
  Float: "number",
  Boolean: "boolean",
  DateTime: "Date",
  Json: "any",
  Bytes: "Buffer",
  BigInt: "bigint",
};

const mapType = (prismaType: string): string => {
  if (prismaType.endsWith("?")) {
    const baseType = prismaType.slice(0, -1);
    return `${baseTypeMapping[baseType] || baseType} | null`;
  } else if (prismaType.endsWith("[]")) {
    const baseType = prismaType.slice(0, -2);
    return `${baseTypeMapping[baseType] || baseType}[]`;
  } else {
    return baseTypeMapping[prismaType] || prismaType;
  }
};

interface Interfaces {
  [key: string]: string[];
}

interface Enums {
  [key: string]: string[];
}

const generateInterfaces = (
  schema: string
): { interfaces: Interfaces; enums: Enums } => {
  const lines = schema.split("\n");
  let currentModel: string | null = null;
  let currentEnum: string | null = null;
  const interfaces: Interfaces = {};
  const enums: Enums = {};
  let inBlockComment = false;

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith("/*")) {
      inBlockComment = true;
    }
    if (inBlockComment) {
      if (line.includes("*/")) {
        inBlockComment = false;
      }
      return;
    }
    if (line.startsWith("//")) {
      return;
    }

    if (line.startsWith("model")) {
      currentModel = line.split(" ")[1];
      interfaces[currentModel] = [];
    } else if (line.startsWith("enum")) {
      currentEnum = line.split(" ")[1];
      enums[currentEnum] = [];
    } else if (currentEnum) {
      if (line === "}") {
        currentEnum = null;
      } else {
        enums[currentEnum].push(line.split(" ")[0]);
      }
    } else if (line && currentModel && !line.startsWith("@@")) {
      const [name, type] = line.split(" ").filter(Boolean);
      if (name === "}") {
        currentModel = null;
      } else {
        const tsType = mapType(type);
        const isOptional = type.endsWith("?");
        interfaces[currentModel].push(
          `${name}${isOptional ? "?" : ""}: ${tsType};`
        );
      }
    }
  });

  return { interfaces, enums };
};

const enumsToTs = (enums: Enums): string => {
  let tsCode = "";
  for (const [name, values] of Object.entries(enums)) {
    tsCode += `type ${name} = ${values
      .map((value) => `"${value}"`)
      .join(" | ")};\n\n`;
  }
  return tsCode;
};

const interfacesToTs = (interfaces: Interfaces): string => {
  let tsCode = "";
  for (const [name, fields] of Object.entries(interfaces)) {
    tsCode += `export interface ${name} {\n`;
    fields.forEach((field) => {
      tsCode += `  ${field}\n`;
    });
    tsCode += `}\n\n`;
  }
  return tsCode;
};

export const convertPrismaSchemaToTs = (schema: string): string => {
  const { interfaces, enums } = generateInterfaces(schema);
  const enumTsCode = enumsToTs(enums);
  const interfaceTsCode = interfacesToTs(interfaces);
  return `${enumTsCode}${interfaceTsCode}`;
};
