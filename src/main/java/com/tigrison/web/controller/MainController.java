package com.tigrison.web.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tigrison.web.domain.BoardDTO;
import com.tigrison.web.service.BoardService;


@Controller
public class MainController {
	@Autowired BoardService service;
	@Autowired BoardDTO bean;

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "home";
	}
	
	@RequestMapping(value="/get/{seq}", method=RequestMethod.GET)
	public @ResponseBody Object get(@PathVariable String seq) {
		logger.info("get 진입");
		bean.setSeq(Integer.parseInt(seq));
		return service.getService(bean);
	};
	
	@RequestMapping(value="/list", method=RequestMethod.GET)
	public @ResponseBody Map<?,?> list() {
		logger.info("list 진입");
		Map<String,Object> map = new HashMap<>();
		map.put("list", service.listService(bean));
		map.put("random", (int)(Math.random()*100000)+1);
		return map;
	};
	
	@RequestMapping(value="/post", method=RequestMethod.POST, consumes="application/json")
	public @ResponseBody int post(@RequestBody BoardDTO bean) {
		logger.info("post 진입");
		return service.postService(bean);
	};
	
	@RequestMapping(value="/put", method=RequestMethod.PUT, consumes="application/json")
	public @ResponseBody int put(@RequestBody BoardDTO bean) {
		logger.info("put 진입");
		return service.putService(bean);
	};
	
	@RequestMapping(value="/delete", method=RequestMethod.DELETE, consumes="application/json")
	public @ResponseBody int delete(@RequestBody BoardDTO bean) {
		logger.info("delete 진입");
		return service.deleteService(bean);
	};
}
