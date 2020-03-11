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

export type ViewLog = View[];

export type WeeklyArticleLog = {
    week: number;
    count: number;
};

export type WeeklyArticleHistory = WeeklyArticleLog[];

export type Targeting = {
    contentType: string;
    sectionName: string;
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
    tags: Tag[];
    epicViewLog?: ViewLog;
    weeklyArticleHistory?: WeeklyArticleHistory;
    mvtId: number;

    // Note, it turns out that showSupportMessaging (defined in the Members Data
    // API) does not capture every case of recurring contributors or last
    // contributions (i.e. the latter two are not simply a subset of the first -
    // we need all three!).
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Timestamp
};

export type Metadata = {
    tracking: Tracking;
    localisation: Localisation;
    targeting: Targeting;
};
