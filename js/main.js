$(document).ready(function(){
	//console.log('ready.......');
	$('#searchUser').on('keyup',function(e){
		//console.log(e.target.value);
		let username = e.target.value;

		$.ajax({
			url:'https://api.github.com/searchusers/'+username,
			data:{
				client_id:'d677ab123e0503e51bd4',
				client_secret:'63096dbcfac87c5e3a824c1bf4a137e9dbf3fe75'
			}
		}).done(function(user){
			$.ajax({
			url:'https://api.github.com/users/'+username+'/repos',
			data:{
				client_id:'d677ab123e0503e51bd4',
				client_secret:'63096dbcfac87c5e3a824c1bf4a137e9dbf3fe75',
				sort: 'created-at',
				per_page: 5
			}
		}).done(function(repos){
			$.each(repos, function(index, repo){
				$('#repos').append(`
					<div class="well">
					<div class="row">
						<div class="col-md-7">
							<strong>${repo.name}</strong>
						</div>
						<div class="col-md-3">
							<span class="badge badge-primary">Primary</span>
							<span class="badge badge-secondary">Public Repo ${repo.fork_count}</span>
							<span class="badge badge-success">Public Gists ${repo.watchers_count}</span>
							<span class="badge badge-warning">followers ${repo.stargazers_count}</span>
						</div>
						<div class="col-md-2">
							<strong></strong>
						</div>
					</div>
					</div>
					`);
			});

		});
			$('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
				    <div class="col-md-3">
				    <img src="${user.avatar_url}" style="width:100%" class="thumbnail">
				    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
				    </div>
				    <div class="col-md-9">
					    <span class="badge badge-primary">Primary</span>
							<span class="badge badge-secondary">Public Repo ${user.public_repos}</span>
							<span class="badge badge-success">Public Gists ${user.public_gists}</span>
							<span class="badge badge-warning">followers ${user.followers}</span>
							<span class="badge badge-info">FOLLOWING ${user.following}</span>
				    </div><br></br>
				    <ul class="list-group">
				    	<li class="list-group-item">Company: ${user.company}</li>
				  </div>
				</div>
				`);
		});
	});
});
  