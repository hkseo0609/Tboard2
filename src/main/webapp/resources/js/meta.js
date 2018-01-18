/******180118 수정 사항******
 	- 람다식 삭제
	- IE에 적용되는 CSS로 변경
	- list 호출 연결 방식 getJSON으로 변경(*ajax 쓸 때 complete 속성 사용하기)
	- IE에서 싱글페이지일 경우 데이터가 즉각 업데이트 되지 않아 sessionStorage를 이용해 list 호출
 ************************/

$(document).ready(function(){
	var i = sessionStorage.getItem('temp');
	$('body').html(layout.basic());
	$('#board_div').html(layout.board());
	
	$.getJSON('./list?v='+i, function(d){
		var frame='';
		var row='';
		sessionStorage.setItem('temp',d.random);
		$.each(d.list, function(i,j){
			var temp = j.createDt;
			var date = temp.split(' ')[0];
			row += '<tr>'
				+'	<td style="width: 10%; ">'+j.seq+'</td>'
				+'	<td style="width: 65%; "><a onclick=" logic.boardSelect(\''+j.seq+'\')">'+j.title+'</a></td>'
				+'	<td style="width: 20%; ">'+date+'</td>'
				+'</tr>';
		});
		frame += row;
		
		$('#tbody').html(frame);
		$('#write_div').html('<button id="write_btn" class="btn btn-danger list-btn" style="float:right">글쓰기</button>');
		$('#write_btn').click(function(e){
			e.preventDefault();
			$('#board_div').html(layout.write());
			$('#write_div').empty();
			$('#confirm_div').html('<button id="yes_btn" class="btn btn-danger list-btn">글쓰기</button>');
			$('#cancle_div').html('<button id="no_btn" class="btn btn-danger del-btn">취소</button>');
			
			$('#yes_btn').click(function(e){
				e.preventDefault();
				logic.boardWrite();
			});
			$('#no_btn').click(function(e){
				e.preventDefault();
				location.href='./';
			});
		});
	});
	
});

logic = (function(){
	var boardSelect = function(x){
		$.ajax({
			url:'./get/'+x,
			method:'get',
			contentType:'application/json',
			success : function(d){
				$('#board_div').html(layout.detail());
				$('#select_title').text(d.board.title);
				$('#select_cont').text(d.board.content);
				$('#select_dt').text(d.board.createDt);
				$('#update_dt').text(d.board.updateDt);
				
				$('#list_div').html('<button id="list_btn" class="btn btn-danger list-btn">목록</button>');
				$('#update_div').html('<button id="up_btn" class="btn btn-danger up-btn">수정</button>');
				$('#delete_div').html('<button id="del_btn" class="btn btn-danger del-btn">삭제</button>');
				
				$('#list_btn').click(function(e){
					e.preventDefault();
					location.href='./';
				});
				
				$('#up_btn').click(function(e){
					e.preventDefault();
					$('#board_div').html(layout.write());
					$('#confirm_div').html('<button id="confirm_btn" class="btn btn-danger up-btn">수정</button>');
					$('#cancle_div').html('<button id="cancle_btn" class="btn btn-danger del-btn">취소</button>');
					$('#up_title').val(d.board.title);
					$('#up_cont').val(d.board.content);
					$('#confirm_btn').click(function(e){
						e.preventDefault();
						logic.boardUpdate(d.board.seq);
					});
					$('#cancle_btn').click(function(e){
						e.preventDefault();
						location.href='./';
					});
				});
				
				$('#del_btn').click(function(e){
					e.preventDefault();
					logic.boardDelete(d.board.seq);
				});
			},
			error : function(m){
				alert('에러 발생'+m);
			}
		});
	};
	
	var boardUpdate = function(x){
		$.ajax({
			url:'./put',
			method:'put',
			data:JSON.stringify({
				'seq':x,
				'title':$('#up_title').val(),
				'content':$('#up_cont').val()
			}),
			contentType:'application/json',
			success : function(){
				alert('글 내용을 수정하였습니다.');
			},
			error : function(m){
				alert('에러 발생'+m);
			},
			complete :function(){
				location.href='./';
			}
		});
	};
	
	var boardDelete = function(x){
		$.ajax({
			url:'./delete',
			method:'delete',
			data:JSON.stringify({
				'seq':x
			}),
			contentType:'application/json',
			success : function(){
				alert('글을 삭제하였습니다.');
			},
			error : function(m){
				alert('에러 발생'+m);
			},
			complete :function(){
				location.href='./';
			}
		});
	};
	
	
	var boardWrite =  function(){
		$.ajax({
			url:'./post',
			method:'post',
			data:JSON.stringify({
				'title':$('#up_title').val(),
				'content':$('#up_cont').val()
			}),
			contentType:'application/json',
			success : function(d){
				alert('글 작성 완료!');
			},
			error : function(m){
				alert('에러 발생'+m);
			},
			complete :function(){
				location.href='./';
			}
		});
	};

	return {
		boardSelect:boardSelect,
		boardUpdate:boardUpdate,
		boardDelete:boardDelete,
		boardWrite:boardWrite
		}
})();

var layout = {
		basic : function(){
			return '<div id="container">'
			+'	<div>'
			+'		<div class="div-img" style="background-image: url(./resources/img/tiger.png); background-repeat: no-repeat;"></div>'
			+'	</div>'
			+'	<div id="content" class="div-content">'
			+'		<div id="navbar" style="width: 800px; margin: 0 auto;">'
			+'			<ul class="nav nav-tabs">'
			+'			  <li role="presentation" class="active"><a href="#">게시판</a></li>'
			+'			</ul>'
			+'		</div>'
			+'		<div id="board_div" class="div-board">'
			+'		</div>'
			+'	</div>'
			+'</div>';
		},
		board : function(){
	         return '<div id="write_div" class="div-write">'
				+'</div>'
	         	+'<table id="brd_tbl" class="table table-inverse" style="margin: 5% auto; width: 90%;">'
      			+ '<thead><tr>'
	            +'<th style="width:10%; text-align:center;">No</th>'
	            +'<th style="width:65%; text-align:center;">제목</th>'
	            +'<th style="width:20%; text-align:center;">작성일</th>'
		        +'</tr></thead>'
		        +'<tbody id="tbody" style="text-align: center;">'
		        +'</tbody></table>'

		},
		detail : function(){
			return '<div style="margin: 3% auto; width: 90%">'
			+'	<div class="div-select" style="height: 60px;">'
			+'		<span id="select_title" style="font-size: 24px; font-weight: 700;">제목입니다</span>'
			+'	</div>'
			+'	<div class="div-select">'
			+'		<p><span style="font-weight:600; margin-right: 10px;">작성 날짜 </span><span id="select_dt" >0000</span></p>'
			+'		<p><span style="font-weight:600; margin-right: 10px;">최근 수정 날짜</span> <span id="update_dt" >0000</span></p>'
			+'	</div>'
			+'	<div style="margin-top: 20px;">'
			+'		<textarea class="form-control" id="select_cont" rows="8" style="overflow-x: hidden; background-color: #ffffff" readonly></textarea>'
			+'	</div>'
			+'	<div style="text-align: center;">'
			+'	    <br/>'
			+'	     <span id="list_div"></span>'
			+'	     <span id="update_div"></span>'
			+'	     <span id="delete_div"></span>'
			+'	 </div>'
			+'</div>';
		},
		write : function(){
			return '<div style="margin: 3% auto; width: 90%">'
			+'	<div class="div-select" style="height: 60px;">'
			+'		<input type="text" id="up_title" class="form-control" placeholder="제목을 입력하세요" ></span>'
			+'	</div>'
			+'	<div style="margin-top: 20px;">'
			+'		<textarea class="form-control" id="up_cont" rows="10" style="overflow-x: hidden; background-color: #ffffff"></textarea>'
			+'	</div>'
			+'	<div style="text-align: center;">'
			+'	    <br/>'
			+'	     <span id="confirm_div"></span>'
			+'	     <span id="cancle_div"></span>'
			+'	 </div>'
			+'</div>';
		},
}