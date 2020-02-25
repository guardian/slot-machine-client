type Localisation = {
  countryCode?: string;
};

type Tracking = {
  ophanPageId: string;
  ophanComponentId: string;
  platformId: string;
  campaignCode: string;
  abTestName: string;
  abTestVariant: string;
  referrerUrl: string;
};

type Tag = {
  id: string;
  type: string;
};

interface View {
  date: number;
  testId: string;
}
type ViewLog = View[];

type Targeting = {
  contentType: string;
  sectionName: string;
  shouldHideReaderRevenue: boolean;
  isMinuteArticle: boolean;
  isPaidContent: boolean;
  tags: Tag[];
  epicViewLog?: ViewLog;

  // Note, it turns out that showSupportMessaging (defined in the Members Data
  // API) does not capture every case of recurring contributors or last
  // contributions (i.e. the latter two are not simply a subset of the first -
  // we need all three!).
  showSupportMessaging?: boolean; // TODO make required once clients updated
  isRecurringContributor?: boolean; // TODO make required once clients updated
  lastOneOffContributionDate?: string; // Platform to send undefined or date as string -> Date.now().toString()
};

export type Metadata = {
  tracking: Tracking;
  localisation: Localisation;
  targeting: Targeting;
};
