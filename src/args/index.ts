export class Args {
    private readonly reducedArgs = new Map<string, string>();

    constructor(args: string[]) {
      args.splice(2).reduce((map, it) => {
        const [key, value] = it.split('=');
        return map.set(key, value);
      }, this.reducedArgs);
    }

    public getAction(): string {
      const action = this.reducedArgs.get('action');
      if (!action) {
        throw new Error('Action is not set');
      }

      return action;
    }
  }
