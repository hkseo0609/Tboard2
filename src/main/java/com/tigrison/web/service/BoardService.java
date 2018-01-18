package com.tigrison.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.tigrison.web.domain.BoardDTO;


@Component
public interface BoardService {
	public Object getService (BoardDTO bean);
	public List<?> listService (BoardDTO bean);
	public int postService (BoardDTO bean);
	public int putService (BoardDTO bean);
	public int deleteService (BoardDTO bean);
}
