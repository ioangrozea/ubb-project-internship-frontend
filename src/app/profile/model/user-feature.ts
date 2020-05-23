export class UserFeature{
  ProfileId: number;
  FeatureText: string;
  FeatureId: number;

  constructor(featureText: string) {
    this.FeatureText = featureText;
  }
}
