export const transformUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,

        address: {
            street: user.Location?.street,
            suite: user.Location?.suite,
            city: user.Location?.city,
            zipcode: user.Location?.zipcode,
            geo: {
                lat: user.Location?.lat,
                lng: user.Location?.lng
            }
        },

        phone: user.phone,
        website: user.website,

        company: {
            name: user.Company?.name,
            catchPhrase: user.Company?.catchPhrase,
            bs: user.Company?.bs
        }
    };
};