// @flow
export type UserType = {
    profile: {
        surveyFirstName?: string,
        surveyName: string,
        email: string,
        fileRepository?: string,
    },
    isANA: boolean,
    isINT: boolean,
    isApiPartner?: boolean,
    intAuth: {
        store?: {
            pp: boolean,
            pya: boolean,
            pyp: boolean,
        },
        usage?: {
            pp: boolean,
            pya: boolean,
        },
        marketing?: {
            advertising: boolean,
            aso: boolean,
        },
    },
};
