import languages from './languages';

export default {
    groups: [
        {
            links: [
                {
                    label: '主页',
                    url: '/',
                    newwin: false,
                },
                {
                    label: '销售',
                    url: '/sales',
                    newwin: true,
                }
            ],
        },
        {
            links: [
                {
                    label: '咨询',
                    url: '/consult',
                    newwin: true,
                },
                {
                    label: '关于',
                    url:
                        '/about',
                    newwin: false,
                }
            ],
        },
    ],
    languages_for_switch: languages
};
