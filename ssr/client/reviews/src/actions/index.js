const reviewsAll = '/api/reviews/all/';
const reviewsInfo = '/api/reviews/info/';

export const getReviewInfo = (workspaceId) => {
    return axios.get(`${reviewsInfo}${workspaceId}`).catch(() => false);
};

export const getReviews = (workspaceId) => {
    return axios.get(`${reviewsAll}${workspaceId}`).catch(() => false);
};

export const getReviewsData = () => axios.get(`/api/reviews/all/${getWorkspaceId()}`);

export const getWorkspaceId = () => {
    const splitUrl = window.location.pathname.split('/').filter((el) => el);
    return splitUrl[splitUrl.length - 1];
};
