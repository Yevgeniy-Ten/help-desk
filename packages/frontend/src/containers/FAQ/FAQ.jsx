import React, { useEffect } from "react";
import { Col, Divider, Row, Avatar } from "antd";
import styles from "./FAQ.module.css";

const FAQ = () => {
  useEffect(() => {}, []);
  return (
    <div style={{ padding: "0 20px" }}>
      <Divider orientation="left">Решения</Divider>
      <Row gutter={16}>
        <Col span={6}>
          <div className={styles.card}>
            <Avatar
              size={128}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Mo_yec-4l6efC3W2cmFzt7c0E-nKhKYkjA&usqp=CAU"
            />
            <h5>Сайты</h5>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.card}>
            <Avatar
              size={128}
              src="https://img2.freepng.ru/20180329/iaq/kisspng-accounting-accountant-computer-icons-bookkeeping-f-finance-5abc92d426a2b6.3434380115223077961583.jpg"
            />
            <h5>Бухгалтерия</h5>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.card}>
            <Avatar
              size={128}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2LtRn8UowmBomodLPh2jo04ODGP8DDJD4w&usqp=CAU"
            />
            <h5>Техническая поддержка</h5>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.card}>
            <Avatar
              size={128}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_K8YJfZwPU1GhJ3xS3FVYnZ2jqMr_CDOwZQ&usqp=CAU"
            />
            <h5>Медицина</h5>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FAQ;
