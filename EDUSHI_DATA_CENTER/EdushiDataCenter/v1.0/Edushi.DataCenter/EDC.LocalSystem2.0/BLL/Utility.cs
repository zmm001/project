�}�� r �  +�9�\����a	����px�<�t����\��L̷s�4(4\��O>1���ۄgM��rbD���)�/�o��IZ]Я�R�ω	хTx����6▀ӣ|F7?�ρ�WYk���^�"x",�1�k�v<��(��"�H�S�t\²L#�=�I���S�~��[n�X�S��XJ�V����s��#.�<ӈ�7|A{�[3��@�m-TR�sr:s��O#��V+}j�g?����3�z�k��417Gc���;Z���ӽOJ��cŴ�#4�02 %�RU�{KO����+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�      if (FieldList == null || FieldList.Length == 0)
                throw new Exception("猪啊，字段都没有,怎么给你构建内存表。");
            DataTable returnTable = new DataTable(TableName);
            foreach (string field in FieldList)
            {
                DataColumn col = new DataColumn(field, typeof(System.String));
                returnTable.Columns.Add(col);
            }
            return returnTable;
        }
    }
}
