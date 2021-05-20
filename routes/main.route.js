module.exports = {
    method: 'GET',
    path: '/get',
    handler: async(request, h) => {

        var d = await h.getModel('user');
        //console.log(d);
        return d.paginate().then({});
    }
}