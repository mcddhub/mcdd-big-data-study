package com.mcddhub;

import lombok.extern.slf4j.Slf4j;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.junit.Assert;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;

/**
 * LsFileContent
 *
 * @version 1.0.0
 * @author: caobaoqi1029
 * @date: 2024/9/12 16:08
 */
@Slf4j
public class LsFileContent {
    private static final String HDFS_URI = "hdfs://master:8020";
    private static final String PATH = "/output/part-r-00000";
    private static final Configuration configuration = new Configuration();

    public static void main(String[] args) {
        try (FileSystem fs = FileSystem.get(URI.create(HDFS_URI), configuration)) {
            Path path = new Path(PATH);
            Assert.assertTrue("File does not exist", fs.exists(path));
            readFile(fs, path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

private static void readFile(FileSystem fs, Path path) throws IOException {
    try (FSDataInputStream inputStream = fs.open(path);
         BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
        String line;
        log.info("============ READ START ================");
        while ((line = reader.readLine()) != null) {
            log.info(line);
        }
        log.info("============ READ ENT   ================");
    }
}
}
