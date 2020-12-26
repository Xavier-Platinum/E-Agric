// querying find data from db
// const {} = require("")

const { ROLE, projects } = require("../roles")


module.exports = {
    canView: (user, project) => {
        return (
            user.role === ROLE.ADMIN ||
            project.userId === user.id
        )
    },
    authGet: (req, res, next) => {
        if(!this.canView(req.user, req.project)) {
            res.send(401)
            return req.flash("Not Authorised");
        }

        next()
    },
    scopedView: (user, project) => {
        if(user.role === ROLE.ADMIN) return projects
        return projects.filter(project => project.userId === user.id)
    } //in that certain route add scopedView(req.user, projects)
}