export class UserPreference{
  ProfileId: number;
  PreferenceText: string;
  PreferenceId: number;

  constructor(PreferenceText: string) {
    this.PreferenceText = PreferenceText;
  }
}
