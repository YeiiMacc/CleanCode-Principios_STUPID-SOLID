(() => {
    // Aplicando el principio de responsabilidad única
    // Prioriza la composición frente a la herencia

    type Gender = 'M' | 'F';

    interface PersonProps {
        firstName: string;
        lastName: string;
        gender: Gender;
        birthDate: Date;
    }

    class Person {
        public firstName: string;
        public lastName: string;
        public gender: Gender;
        public birthDate: Date;

        constructor({ firstName, lastName, gender, birthDate }: PersonProps) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.birthDate = birthDate;
        }
    }


    interface UserProps {
        email: string;
        role: string;
    }
    class User {

        public email: string;
        public role: string;
        private lastAccess: Date;

        constructor({ email, role }: UserProps) {
            this.lastAccess = new Date();
            this.email = email;
            this.role = role;
        }

        checkCredentials() {
            return true;
        }
    }


    interface SettingsProps {
        lastFolderOpen: string;
        workingDirectory: string;
    }

    class Settings {
        public workingDirectory: string;
        public lastFolderOpen: string;

        constructor({ workingDirectory, lastFolderOpen }: SettingsProps) {
            this.workingDirectory = workingDirectory;
            this.lastFolderOpen = lastFolderOpen;
        }
    }


    // Nuevo User Settings
    interface UserSettingsProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        lastFolderOpen: string;
        firstName: string;
        lastName: string;
        role: string;
        workingDirectory: string;
    }

    class UserSettings {
        public person: Person;
        public user: User;
        public settings: Settings;

        constructor({
            firstName, lastName, gender, birthDate,
            email, role,
            workingDirectory, lastFolderOpen,
        }: UserSettingsProps) {
            this.person = new Person({ firstName, lastName, gender, birthDate });
            this.user = new User({ email, role });
            this.settings = new Settings({ workingDirectory, lastFolderOpen })
        }
    }



    const userSettings = new UserSettings({
        birthDate: new Date('1985-10-21'),
        email: 'yeiimacc@google.com',
        gender: 'M',
        lastFolderOpen: '/home',
        firstName: 'Yeison',
        lastName: 'Macias',
        role: 'Admin',
        workingDirectory: '/usr/home'
    });

    console.log({ userSettings, credentials: userSettings.user.checkCredentials() });

})()