export const validateUserData = (data) => {
    const { name, username, email, phone, website, address, company } = data;

    if (!name || !username || !email || !phone || !website || !address || !company) {
        return false;
    }

    const { street, suite, city, zipcode, geo } = address;
    if (!street || !suite || !city || !zipcode || !geo?.lat || !geo?.lng) {
        return false;
    }

    const { name: companyName, catchPhrase, bs } = company;
    if (!companyName || !catchPhrase || !bs) {
        return false;
    }

    return true;
};

export const validateUserId = (id) => {
    const parsed = Number(id);
    return Number.isInteger(parsed) && parsed > 0;
};