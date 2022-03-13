export interface IUserGroup{
    name: string,
    contacts: Array<IContact>
}

export interface IContact{
    contact_name: string,
    contact_number: number,
    user_id: string,
    photo_url: string
}

export interface IUserPlace{
    label: string,
    address: string,
    location: {
        lat: number,
        long: number
    }
}