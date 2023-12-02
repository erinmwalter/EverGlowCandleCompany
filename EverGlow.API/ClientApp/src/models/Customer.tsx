export default interface Customer{
    id: number;
    fullName: string;
    email: string;
    address?: string;
    zip?: string;
    stateCode?: string;
    city?: string;
    phone?: string;
}