package com.tigrison.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tigrison.web.domain.BoardDTO;
import com.tigrison.web.mapper.MainMapper;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired MainMapper mapper;

	@Override
	public Object getService(BoardDTO bean) {
		Map<String,Object> map = new HashMap<>();
		map.put("board", mapper.selectOne(bean));
		return map;
	}

	@Override
	public List<?> listService(BoardDTO bean) {
		
		return mapper.selectList(bean);
	}

	@Override
	public int postService(BoardDTO bean) {
		return mapper.insert(bean);	
	}

	@Override
	public int putService(BoardDTO bean) {
		return mapper.update(bean);
		
	}

	@Override
	public int deleteService(BoardDTO bean) {
		return mapper.delete(bean);
		
	}

}
