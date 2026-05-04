const salaController = require("../../src/controllers/salaController");
const salaService = require("../../src/services/salaService");

jest.mock("../../src/services/salaService");

describe("Sala Controller Unit Tests", () => {

  test("getSalas debe responder con lista de salas", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const mockSalas = [{ id: 1, nombre: "Sala A" }];
    salaService.getAllSalas.mockResolvedValue(mockSalas);

    await salaController.getSalas(req, res);

    expect(salaService.getAllSalas).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockSalas);
  });

});
