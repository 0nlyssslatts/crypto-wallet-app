import { useState } from "react";
import {
    Select,
    Space,
    Typography,
    Flex,
    Divider,
    Form,
    InputNumber,
    Button,
} from "antd";
import { useCrypto } from "../context/crypto-context";

const validateMessages = {
    required: "${label} is required!",
    types: {
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

export default function AddAssetForm() {
    const [form] = Form.useForm();
    const { crypto } = useCrypto();
    const [coin, setCoin] = useState(null);

    if (!coin) {
        return (
            <Select
                style={{
                    width: "100%",
                }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt="icon"
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        );
    }

    function onFinish(values) {
        console.log(values);
    }
    function handleAmountChange(value) {
        const price = form.getFieldValue("price");
        const newTotal = +(value * price).toFixed(2);
        form.setFieldValue("total", newTotal);
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue("amount");
        const newPrice = +(amount * value).toFixed(2);
        form.setFieldValue("total", newPrice);
    }

    return (
        <Form
            form={form}
            name="basic"
            validateMessages={validateMessages}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: coin.price.toFixed(2),
            }}
            onFinish={onFinish}
        >
            <Flex align="center">
                <img
                    src={coin.icon}
                    alt={coin.name}
                    style={{ width: 40, marginRight: 10 }}
                />
                <Typography.Title level={2} style={{ margin: 0 }}>
                    {coin.name}
                </Typography.Title>
            </Flex>
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                style={{ width: "100%" }}
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                    },
                ]}
            >
                <InputNumber
                    onChange={handleAmountChange}
                    placeholder="Enter coin amount"
                    style={{ width: "100%" }}
                />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber
                    onChange={handlePriceChange}
                    style={{ width: "100%" }}
                />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    );
}
