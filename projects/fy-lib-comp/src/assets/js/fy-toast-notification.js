var toastTrigger = document.getElementById('toastBtn')
var toastLiveExample  = document.getElementById('toast')
if (toastTrigger ) {
    toastTrigger.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    })
}