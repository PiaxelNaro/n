// @flow
const mapResultDataObject = (res: { data: Array<any>, more_url?: string }) => {
    let apps;
    if (res.data && res.data.length > 0) {
        apps = res.data.map(app => ({
            id: app.product_id,
            icon: app.icon,
            company: app.publisher_name,
            name: app.product_name,
            link: app.target_url,
            store: app.market,
            flagCode: app.country_code,
            showStoreIcon: true,
        }));
        return {
            results: apps,
            moreUrl: res.more_url || '',
        };
    }
    return {
        results: [],
    };
};

export default mapResultDataObject;
