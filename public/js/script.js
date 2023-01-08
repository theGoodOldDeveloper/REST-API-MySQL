/* var valasz = prompt('Na mizujs?')
console.log(valasz)
alert(valasz) */
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
    $('.editPost').on('click', function () {
        console.log('id', this.id)
        let title = ''
        let content = ''
        for (let post of posts) {
            if (post.id == this.id) {
                title = post.title
                content = post.content
            }
        }
        $("#editModal").modal('show')
        //document.getElementById('editHeadModal').innerHTML = `Editing Id: ${this.id}`
        $("#editHeadModal").html(`Editing Id: ${this.id}`)
        //document.getElementById('editTitle').value = title
        //document.getElementById('editContent').value = content
        $("#editTitle").val(title)
        $("#editContent").val(content)


        $("#sendEditData").on('click', () => {
            console.log('klikkkelteeeemmmmm')
            editPostData(this.id)
        })

        async function editPostData(id) {
            //title = document.getElementById('editTitle').value
            //content = document.getElementById('editContent').value
            title = $("#editTitle").val()
            content = $("#editContent").val()
            console.log(id, title, content, '**********************')

            var response = await fetch(`/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id: id, title: title, content: content }),
            })
            updateRespone = await response.json()
            console.log('updateRespone -affectedRows-------------- ', updateRespone.affectedRows)
            if (updateRespone.affectedRows == 1) {
                console.log('SIKER 😛😛😛😛😛😛')
                window.location = '/'
            }

        }
    })
}


/* <dl><dt>${post.id} ${post.title}</dt></dl> */
/*             <button class='btn bg-success text-white p-1 mt-1 updateItem' id=${post.id}><i class="bi bi-pencil-square"></i> UPDATE </i></button>
         */

/* 
"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
*/
/* 
var response = await fetch(`/posts/${id}?title=5555555555&content=OK+99999999999`
*/