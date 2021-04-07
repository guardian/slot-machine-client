type Tracking = {
    ophanPageId: string;
    platformId: string;
    clientName: string;
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
    countryCode?: string;

    // Note, it turns out that showSupportMessaging (defined in the Members Data
    // API) does not capture every case of recurring contributors or last
    // contributions (i.e. the latter two are not simply a subset of the first -
    // we need all three!).
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Timestamp
    modulesVersion?: string;
};

export type Metadata = {
    tracking: Tracking;
    targeting: Targeting;
};
