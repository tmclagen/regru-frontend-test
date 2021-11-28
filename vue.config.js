const fakeIssues = require('./data/fakeIssues.json');
const fakeStaff = require('./data/fakeStaff.json');
const fakeStatuses = require('./data/fakeStatus.json');

module.exports = {
    devServer: {
        before(app) {
            app.get('/api/user', (req, res) => {
                res.json(fakeStaff);
            });

            app.get('/api/user/:id', (req, res) => {
                const userId = req.params.id;
                const user = fakeStaff.find(item => item.id === userId);

                if(!user) {
                    return void res.status(404).end();
                }

                res.json(user);
            });

            app.get('/api/issue', (req, res) => {
                res.json(fakeIssues);
            });

            app.get('/api/issue/:id', (req, res) => {
                const issueId = req.params.id;
                const issue = fakeIssues.find(item => item.id === issueId);

                if(!issue) {
                    return void res.status(404).end();
                }

                res.json(issue);
            });

            app.get('/api/status', (req, res) => {
                res.json(fakeStatuses);
            });
        }
    }
}
