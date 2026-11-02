import {faker} from '@faker-js/faker';
export class UserBuilder {

    withEmail() {
        this.email = faker.internet.email();
        return this;
    }
    withPassword(length = 10) {
        this.password = faker.internet.password({ length });
        return this;
    }
    withName() {
        this.name = faker.person.fullName();
        return this;
    }
    build() {
      const result = structuredClone(this);
      return result;
    }
}

// const user = new UserBuilder().withEmail(); {} -> {email: faker}
// const user = new UserBuilder().withEmail().withPassword(12).withName().build(); {} -> {email: faker, password: faker, name : faker}
// const user = new UserBuilder().withEmail().withName().build(); {} -> {email: faker, password: faker, name : faker}


/* 
    const user = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password:  faker.internet.password()
}
*/