{ pkgs, ... }: {
  channel = "unstable";

  packages = [
    pkgs.nodejs_24
    pkgs.nodePackages.pnpm
    pkgs.openssl
  ];

  env = {
    NODE_ENV = "development";
  };

  idx = {
    workspace = {
      onCreate = {
        install = "pnpm install";
      };
    };
  };
}
