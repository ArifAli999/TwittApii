

  import development from "./settings-development";

const settings = {
  development
}[process.env.NODE_ENV];

export default settings;