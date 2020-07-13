// Java code to illustrate reading a 
// CSV file line by line 

package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.FileReader;
import com.opencsv.*;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/donations")
public class DonationsServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String file="/home/ps3072/software-product-sprint/project/src/main/webapp/charities.csv";
      String org= csvToJson(file);
      response.setContentType("application/json;");
      response.getWriter().println(org);
  }

private String csvToJson(String file) 
{ //return json of all rows
    List<String[]> json= new ArrayList<String[]>();
	try { 

		// Create an object of filereader 
		// class with CSV file as a parameter. 
		FileReader filereader = new FileReader(file); 
		// create csvReader object passing 
		// file reader as a parameter 
		CSVReader csvReader = new CSVReader(filereader); 
		String[] nextRecord; 

		// we are going to read data line by line 
		while ((nextRecord = csvReader.readNext()) != null) { 
			for (String cell : nextRecord) { 
				System.out.print(cell + "\t");                  
			} 
            json.add(nextRecord);
			System.out.println(); 
		} 
	} 
	catch (Exception e) { 
		e.printStackTrace(); 
	} 

    return convertToJson(json);
} 

private String convertToJson(List<String[]> toBeConverted) {
    Gson gson = new Gson();
    String json = gson.toJson(toBeConverted);
    System.out.println("convertToJson(): json= "+json);
    return json;
  }
}
