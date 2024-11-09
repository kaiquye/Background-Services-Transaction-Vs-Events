class Register {
  private instances;

  constructor() {
    this.instances = {};
  }

  public register(nameOfClass: string, instanceOfClass) {
    console.log('adding instance:', nameOfClass);
    if (this.instances[nameOfClass]) {
      throw new Error('already exists registered');
    }

    this.instances[nameOfClass] = instanceOfClass;
  }

  public getInstance<classType>(nameOfClass: string): classType {
    console.warn('get instancse:', nameOfClass);
    if (!this.instances[nameOfClass]) {
      return null;
    }

    return new this.instances[nameOfClass]();
  }
}

export const register = new Register();
