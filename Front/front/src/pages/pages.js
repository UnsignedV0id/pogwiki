import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Pages() {
  const { id } = useParams();
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/pages/${id}`)
      .then(response => {
        const { title, content } = response.data;
        setPageTitle(title);
        setPageContent(content);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da página:", error);
      });
  }, [id]);

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#000" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        {pageTitle}
      </Typography>
      <div style={{ backgroundColor: "#333", padding: "10px", borderRadius: "5px" }}>
        <ReactMarkdown
          children={pageContent}
          components={{
            p: ({ node, ...props }) => <p style={{ color: 'white' }} {...props} />,
            h1: ({ node, ...props }) => <h1 style={{ color: 'white' }} {...props} />,
            h2: ({ node, ...props }) => <h2 style={{ color: 'white' }} {...props} />,
            h3: ({ node, ...props }) => <h3 style={{ color: 'white' }} {...props} />,
            h4: ({ node, ...props }) => <h4 style={{ color: 'white' }} {...props} />,
            h5: ({ node, ...props }) => <h5 style={{ color: 'white' }} {...props} />,
            h6: ({ node, ...props }) => <h6 style={{ color: 'white' }} {...props} />,
            li: ({ node, ...props }) => <li style={{ color: 'white' }} {...props} />,
            blockquote: ({ node, ...props }) => <blockquote style={{ color: 'white' }} {...props} />,
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter style={darcula} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
              ) : (
                <code className={className} {...props} />
              )
            },
            a: ({ node, ...props }) => <a style={{ color: '#87CEFA' }} {...props} />,
          }}
        />
      </div>
    </Box>
  );
}

export default Pages;
