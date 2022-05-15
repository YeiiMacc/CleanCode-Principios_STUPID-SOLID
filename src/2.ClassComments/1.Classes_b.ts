(() => {

    // No aplicando el principio de responsabilidad unica

    type Gender = 'M' | 'F';

    interface PersonProps {
        birthDate: Date;
        gender: Gender;
        name: string;
    }

    class Person {
        public birthDate: Date;
        public gender: Gender;
        public name: string;

        constructor({ birthDate, gender, name }: PersonProps) {
            this.birthDate = birthDate;
            this.gender = gender;
            this.name = name;
        }
    }



    
    interface UserProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        name: string;
        role: string;
    }

    class User extends Person {

        public email: string;
        public lastAccess: Date;
        public role: string;

        constructor({
            birthDate,
            email,
            gender,
            name,
            role,
        }: UserProps) {
            super({ birthDate, gender, name });
            this.email = email;
            this.lastAccess = new Date();
            this.role = role;
        }

        checkCredentials() {
            return true;
        }
    }




    interface UserSettingsProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        lastOpenFolder: string;
        name: string;
        role: string;
        workingDirectory: string;
    }

    class UserSettings extends User {
        public lastOpenFolder: string;
        public workingDirectory: string;

        constructor({
            lastOpenFolder,
            workingDirectory,
            email,
            role,
            name,
            gender,
            birthDate
        }: UserSettingsProps) {
            super({ email, role, name, gender, birthDate });
            this.lastOpenFolder = lastOpenFolder;
            this.workingDirectory = workingDirectory;
        }
    }

    const newUserSettings = new UserSettings({
        birthDate: new Date('1985-10-21'),
        email: 'yeiimaccdev@gmail.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Yeison',
        role: 'Admin',
        workingDirectory: '/user/home',
    });

    console.log({ newUserSettings });
    
})();