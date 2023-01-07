getData()


//INFO:TODO:INFO:
async function getData() {
    console.log('OK')
    let response = await fetch("/posts", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
        .then(console.log('Hmmmmmmmmm.......... 01'))
        .then(console.log('Hmmmmmmmmm.......... 02'))
        .catch(function (error) {
            console.log('...haaaaaaat ez nem jott ossze. 😛')
            console.log(error)
        })
    let posts = await response.json()
    console.log(posts)
    console.table(posts)
    renderPosts(posts)
}

function renderPosts(posts) {

    let allPostsHTML = ''
    let reversePost = []
    posts = posts.reverse()
    for (post of posts) {
        allPostsHTML += `
        <section class="mx-auto my-5" style="max-width: auto;">
        <div class="card d-flex" style="width: 100%; height: 12rem;">
        <div class="card-header bg-info">
        <kbd>${post.id} ${post.title}</kbd>
        </div>
        <div class="card-body">${post.content}</div>
        <div class="card-footer">
            <div class="d-flex justify-content-around">

            <button class='btn bg-danger text-white p-1 mt-1 delPost' id=${post.id}><i class="bi bi-person-x"> DEL </i></button>


            <button class='btn bg-success text-white p-1 mt-1 editPost' id=${post.id}><i class="bi bi-pen-fill"> EDIT </i></button>
            </div>
        </div>
        </div>
        </section>
        `
    }
    document.getElementById('viewPosts').innerHTML = allPostsHTML
    $('.delPost').on('click', function () {
        console.log('id', this.id)
        delPostData(this.id)
    })
    async function delPostData(id) {
        //console.log('***************************', `/registeredpersons/delete/${id}`)
        var response = await fetch(`/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },

        })
        deleteRespone = await response.json()
        console.log('deleteRespone -affectedRows-------------- ', deleteRespone.affectedRows)
        if (deleteRespone.affectedRows == 1) {
            console.log('SIKER 😛')
            window.location = '/'
        }
    }
}


/* <dl><dt>${post.id} ${post.title}</dt></dl> */
/*             <button class='btn bg-success text-white p-1 mt-1 updateItem' id=${post.id}><i class="bi bi-pencil-square"></i> UPDATE </i></button>
         */