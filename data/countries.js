const countries = {
    ALL: {
        code: 'ALL',
        name: 'All Countries',
    },
    AU: {
        code: 'AU',
        name: 'Australia',
        isLocked: true,
    },
    US: {
        code: 'US',
        name: 'America',
    },
    KO: {
        code: 'KO',
        name: 'South of Korea',
        isLocked: true,
    },
    LG: {
        code: 'LG',
        name: 'Long Long Name Country',
    },
    UK: {
        code: 'UK',
        name: 'England',
    },
};

const categories = [
    {
        name: 'All Countries',
        countries: ['ALL', 'AU', 'US', 'KO', 'LG', 'UK'],
    },
    {
        name: 'Most Popular',
        countries: ['ALL', 'AU', 'US', 'UK'],
    },
];

export { categories, countries };
