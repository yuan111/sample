$(document).ready(function(){
	//delete product
	$('.del').click(function(){
		var id =$(this).data('id')
		var tr = $('.item-id-' + id)
		$.ajax({
			type: 'DELETE',
			url: '/admin/list?id=' + id
		})
		.done(function(result){
			if(result.success===1){
				if(tr.length >0){
					tr.remove()
				}
			}
		})
	})
	// open modal for adding new product
	$('#add-btn').click(function(){
		$('#add-modal').modal('show');

	})

	// open modal for updating products
	$('.upd').click(function(){
		var id = $(this).data('id')
		var tr = $('.item-id-' + id)
		$('#updateId').val(id)
		$('#updateName').val(tr.find('.name').text())
		$('#updatePrice').val(tr.find('.price').text())
		$('#updateImage').val(tr.find('.image').val())
		$('#updateDescription').val(tr.find('.description').text())
		$('#update-modal').modal('show')

	})
})