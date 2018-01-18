package com.tigrison.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tigrison.web.domain.BoardDTO;

@Repository
public interface MainMapper {
	public Object selectOne (BoardDTO bean);
	public int insert(Object o);
	public List<?> selectList(BoardDTO bean);
	public String count(BoardDTO bean);
	public int update (Object o);
	public int delete(BoardDTO bean);
}
