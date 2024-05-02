export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
  typescript: "5.0.3",
  java: "15.0.2",
  // c: "11",
  // cpp: "11",
  csharp: "6.12.0",
  // ruby: "3.0.2",
  // rust: "1.56.0",
  // go: "1.17",
  // swift: "5.5.1",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Yunomi Xavia")\n`,
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Yunomi Xavia");\n`,
  typescript: `type Params = {\n\tname: string;\n};\n\nfunction greet({ name }: Params) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet({ name: "Yunomi Xavia" });\n`,
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Yunomi Xavia!");\n\t}\n}\n`,
  // c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, Yunomi Xavia!\\n");\n\treturn 0;\n}\n`,
  // cpp: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, Yunomi Xavia!" << std::endl;\n\treturn 0;\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello, Yunomi Xavia!");\n\t\t}\n\t}\n}\n',
  // ruby: `def greet(name)\n\tputs "Hello, #{name}!"\nend\n\ngreet("Yunomi Xavia")\n`,
  // rust: `fn main() {\n\tprintln!("Hello, Yunomi Xavia!");\n}\n`,
  // go: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Yunomi Xavia!")\n}\n`,
  // swift: `func greet(name: String) {\n\tprint("Hello, \\(name)!")\n}\n\ngreet(name: "Yunomi Xavia")\n`,
  php: `<?php\n\n$name = "Yunomi Xavia";\necho "Hello, $name!";\n\n?>\n`,
};
