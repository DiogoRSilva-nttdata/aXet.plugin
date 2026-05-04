const salaService = require("../../src/services/salaService");
const { Sala } = require("../../src/models");

jest.mock("../../src/models", () => ({
  Sala: {
    findAll: jest.fn(),
    create: jest.fn()
  }
}));

describe("Sala Service Unit Tests", () => {

  test("getAllSalas debe devolver lista de salas", async () => {
    const mockData = [{ id: 1, nombre: "Sala A" }];
    Sala.findAll.mockResolvedValue(mockData);

    const result = await salaService.getAllSalas();

    expect(Sala.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test("createSala debe crear una sala", async () => {
    const newSala = { nombre: "Sala B", capacidad: 30 };
    Sala.create.mockResolvedValue(newSala);

    const result = await salaService.createSala(newSala);

    expect(Sala.create).toHaveBeenCalledWith(newSala);
    expect(result).toEqual(newSala);
  });

});
