package com.google.sps.servlets;

import com.google.gson.Gson;
import com.opencsv.CSVReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/business")
public class BusinessServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String bus =
        csvToJson("/home/skolb/software-product-sprint/team13/src/main/webapp/businesses.csv");
    response.setContentType("application/json;");
    response.getWriter().println(bus);
  }

  // from https://www.geeksforgeeks.org/reading-csv-file-java-using-opencsv/
  // changes csv to json for all rows
  private String csvToJson(String file) { // return json of all rows
    List<String[]> json = new ArrayList<String[]>();
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
    } catch (Exception e) {
      e.printStackTrace();
    }
    return convertToJson(json);
  }

  private String convertToJson(List<String[]> toBeConverted) {
    Gson gson = new Gson();
    String json = gson.toJson(toBeConverted);
    System.out.println("convertToJson(): json= " + json);
    return json;
  }
}