const fakeIssues = require('./data/fakeIssues.json');
const fakeStaff = require('./data/fakeStaff.json');
const fakeStatuses = require('./data/fakeStatus.json');

module.exports = {
    devServer: {
        before(app) {
            app.get('/user/:id', (req, res) => {
                const userId = req.params.id;
                const user = fakeStaff[userId];

                if(!user) {
                    return void res.status(404).end();
                }

                res.json(user);
            });

            app.get('/issue', (req, res) => {
                res.json(fakeIssues);
            });

            app.get('/issue/:id', (req, res) => {
                const issueId = req.params.id;
                const issue = fakeStaff[issueId];

                if(!issue) {
                    return void res.status(404).end();
                }

                res.json(issue);
            });

            app.get('/status', (req, res) => {
                res.json(fakeStatuses);
            })
        }
    }
}
