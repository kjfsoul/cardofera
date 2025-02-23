import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContacts } from '../../hooks/useContacts';
const TestUseContacts = () => {
    const { data: contacts, isLoading, isError } = useContacts();
    if (isLoading)
        return _jsx("div", { children: "Loading contacts..." });
    if (isError)
        return _jsx("div", { children: "Error loading contacts." });
    return (_jsxs("div", { children: [_jsx("h1", { children: "Contacts" }), _jsx("ul", { children: contacts.map((contact) => (_jsxs("li", { children: [contact.name, " - ", contact.email] }, contact.id))) })] }));
};
export default TestUseContacts;
