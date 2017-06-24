// @flow
export type UserType = {
    profile: {
        surveyFirstName?: string,
        surveyName: string,
        email: string,
        fileRepository?: string,
    },
    isAdmin: boolean,
    auth: Object,
};
