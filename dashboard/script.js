
body {
  margin: 0;
  padding: 25px;
  font-family: Arial, sans-serif;
  background: #f4f6fa;
  color: #263247;
}

header {
  margin-bottom: 25px;
}

header h1 {
  margin-bottom: 5px;
}

#lastUpdated {
  color: #68758a;
  font-size: 13px;
}

.summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 25px 0;
}

.summary div {
  background: white;
  padding: 22px;
  border-radius: 9px;
  font-weight: bold;
  box-shadow: 0 2px 8px #0000000d;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

select, input {
  padding: 12px;
  border: 1px solid #d7dce5;
  border-radius: 6px;
  background: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e8ebf0;
  font-size: 13px;
}

th {
  background: #eaf0f8;
}

a {
  color: #1769c2;
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media(max-width: 900px) {
  .summary {
    grid-template-columns: repeat(2, 1fr);
  }

  table {
    display: block;
    overflow-x: auto;
  }
}
