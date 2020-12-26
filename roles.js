const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
}

module.exports = {
    ROLE: ROLE,
    users: [
        {id: 1, name: "lawrente", role: ROLE.ADMIN},
        {id: 2, name: "lawrence", role: ROLE.BASIC},
        {id: 3, name: "kwis", role: ROLE.BASIC}
    ],
    projects: [
        {id: 1, name: "Kwis Francis", userId: 1},
        {id: 2, name: "Lawrencte Francis", userId: 2},
        {id: 3, name: "Kwis Francis", userId: 3}
    ]
}