export function PassAuth() {
  return function (target: any, name: string, desc: any) {
    Reflect.defineMetadata('PASS_AUTH', true, target[name]);
  };
}
