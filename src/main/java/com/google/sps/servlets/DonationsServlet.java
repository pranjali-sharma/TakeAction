// Java code to illustrate reading a
// CSV file line by line

package com.google.sps.servlets;

import com.google.gson.Gson;
import com.opencsv.*;
import java.io.FileReader;
import java.io.IOException;
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
    String file = "./CSV/charities.csv";
    String org = csvToJson(file);
    response.setContentType("application/json;");
    response.getWriter().println(org);
  }

  private String csvToJson(String file) { // return json of all rows

    String json = "{ \"charities\": [";
    try {
      // Create an object of filereader
      // class with CSV file as a parameter.
      FileReader filereader = new FileReader(file);
      // create csvReader object passing
      // file reader as a parameter
      CSVReader csvReader = new CSVReader(filereader);
      String[] nextRecord;
      String col0 = "id";
      String col1 = "name";
      String col2 = "link";
      String col3 = "blurb";

      // we are going to read data line by line
      while ((nextRecord = csvReader.readNext()) != null) {
        String row = "{";
        int ctr = 0;
        for (String cell : nextRecord) {
          switch (ctr) {
            case 0:
              row += "\"" + col0 + "\": ";
              break;
            case 1:
              row += "\"" + col1 + "\": ";
              break;
            case 2:
              row += "\"" + col2 + "\": ";
              break;
            case 3:
              row += "\"" + col3 + "\": ";
              break;
            default:
              break;
          }
          row += "\"" + cell + "\", ";
          ctr++;
        }
        row = row.substring(0, row.length() - 2);
        json += row + "},";
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    json = json.substring(0, json.length() - 1);
    json += "]}";
    return json;
  }

}
